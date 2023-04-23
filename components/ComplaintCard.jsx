import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios"

const baseUrl =
  "https://django-server-production-b3bd.up.railway.app/api/complaints/";

export default function ComplaintCard(props) {
  const [value, setValue] = React.useState(true);
  const handleSendSelection = (id) => {
    setValue(!value);
    // console.log(value);

    axios.put(baseUrl+`${id}/`,{
        description: props.description,
        is_resolved: value,
        student_id: props.studentId,
    })
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent sx={{ paddingBottom: "0px" }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Complaint {props.complaintId}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ paddingBottom: "5px" }}
            >
              {props.description}
            </Typography>
            <Typography variant="body2">
              Filed by Student {props.studentId}
            </Typography>
          </CardContent>
          <CardActions sx={{ paddingTop: "2px" }}>
            <Checkbox onClick={()=>handleSendSelection(props.complaintId)} /> Is the issue resolved?
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
