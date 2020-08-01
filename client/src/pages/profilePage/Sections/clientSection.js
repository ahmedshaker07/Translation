import React from "react";
import 'date-fns';
import axios from "axios"
import Cookies from "universal-cookie";
import MaterialTable from 'material-table';
// @material-ui/core components
import { Button,TextField,Dialog ,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// @material-ui/icons
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CheckIcon from '@material-ui/icons/Check';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const requestsColumns = [
    { title: "From", field: "fromLanguage"},
    { title: "To", field: "toLanguage" },
    { title: "Date", field: "startDate", grouping: false , type: "date"},
    { title: "Starts at", field: "startDate", grouping: false, type: "time"},
    { title: "Ends at", field: "finishDate", grouping: false, type: "time"},
    { title: "Assigned to", field: "assignedTo"} 
  ]  
const languages=["Afrikaans","Albanian","Amharic","Arabic", "Aramaic","Armenian","Assamese","Aymara","Azerbaijani",
  "Balochi","Bamanankan","Bashkort","Basque","Belarusan","Bengali","Bhojpuri","Bislama","Bosnian","Brahui","Bulgarian","Burmese",
  "Cantonese","Catalan","Cebuano","Chechen","Cherokee","Chinese","Croatian","Czech",
  "Dakota","Danish","Dari","Dholuo","Dutch",
  "English","Esperanto","Estonian","Éwé",
  "Finnish","French",
  "Georgian","German","Gikuyu","Greek","Guarani","Gujarati",
  "Haitian Creole","Hausa","Hawaiian","Hebrew","Hiligaynon","Hindi","Hungarian",
  "Icelandic","Igbo","Ilocano","Indonesian","Inuit","Irish",
  "Gaelic",
  "Italian",
  "Japanese","Jarai","Javanese",
  "Kabyle","Kannada","Kashmiri","Kazakh","Khmer","Khoekhoe","Korean","Kurdish","Kyrgyz",
  "Lao","Latin","Latvian","Lingala","Lithuanian",
  "Macedonian","Maithili","Malagasy","Malay","Malayalam","Marathi","Mende","Mongolian",
  "Nahuatl","Navajo","Nepali","Norwegian",
  "Ojibwa","Oriya","Oromo",
  "Pashto","Persian","Polish","Portuguese","Punjabi",
  "Quechua",
  "Romani","Romanian","Russian","Rwanda",
  "Samoan","Sanskrit","Serbian","Shona","Sindhi","Sinhala","Slovak","Slovene","Somali","Spanish","Swahili","Swedish",
  "Tachelhit","Tagalog","Tajiki","Tamil","Tatar","Telugu","Thai","Tigrigna","Tok Pisin",
  "Turkish","Turkmen",
  "Ukrainian","Urdu","Uyghur","Uzbek",
  "Vietnamese",
  "Warlpiri","Welsh","Wolof",
  "Xhosa",
  "Yakut","Yiddish","Yoruba","Yucatec",
  "Zapotec","Zulu"]

export default function ClientPage(props) {
  const [open, setOpen] = React.useState(false);
  const [fromLanguage, setFromLanguage] = React.useState("");
  const [toLanguage, setToLanguage] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [finishDate, setFinishDate] = React.useState(new Date());
  const [requestsData,setReqData]= React.useState([]);

  
  React.useEffect(()=>{
      const cookies= new Cookies();
      const token = cookies.get("token");
      const usertype= cookies.get("usertype")
      if(token !=="" && usertype==="Client"){
        axios({
            method: 'get',
            url: "http://localhost:5000/api/requests/clientRequests/",
            headers:{
                Authorization: token
            }
          }).then(res => (setReqData(res.data.data)))
      }
  },[])

  const onChangeTwo = date => {
    StartDateChange(date)
    finishDateChange(date)
  }
  const StartDateChange = date => {
    setStartDate(date);
  };
  const finishDateChange = date => {
    setFinishDate(date);
  };
  const fromLanguageChange = event => {
    setFromLanguage(event.target.value)
  };
  const toLanguageChange = event => {
    setToLanguage(event.target.value)
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (props) =>{
    const cookies = new Cookies();
    const token = cookies.get("token")

    if(props.assignedTo!=="Not Assigned"){
        axios({
            method: 'post',
            url: "http://localhost:5000/api/requests/assignTranslatorPull/",
            headers:{
                Authorization: token,
                id: (String)(props._id),
                username: (props.assignedTo)
            }
        })
    }
    axios({
        method: 'post',
        url: "http://localhost:5000/api/requests/assignPull/",
        headers:{
            Authorization: token,
            id: (String)(props._id),
            username: (String)(props.madeBy)
        }
    })
    .then(axios({
        method: 'post',
        url: "http://localhost:5000/api/requests/delete/",
        headers:{
            Authorization: token,
            id: props._id
        }
    }))
    window.location.reload()
  }
  const handleSubmit = () => {
    if(fromLanguage==="" || toLanguage===""){
        alert("please enter languages");
        return;
    }
    if(!languages.includes((fromLanguage.charAt(0).toUpperCase() + fromLanguage.slice(1)))||!languages.includes((toLanguage.charAt(0).toUpperCase() + toLanguage.slice(1)))){
        alert("please enter two valid languages");
        return;
    }
    if(startDate<=new Date()){
        alert("The date must be after today for processing time");
        return;
    }
    if(startDate.getHours()<8 || startDate.getHours()>20){
        alert("Start time must be between 8 AM and 8 PM");
        return;
    }
    if(finishDate<=startDate){
        alert("Finish time must be after start time");
        return;
    }
    if(finishDate.getHours()<8 || finishDate.getHours()>21){
        alert("Finish time must be between 8 AM and 9 PM");
        return;
    }
    if(finishDate-startDate<900000){
        alert("Duration must be at least 15 mins");
        return;
    }
    const cookies = new Cookies();
    const token = cookies.get("token");
    const username= cookies.get("username");

    axios({
        method: 'post',
        url: "http://localhost:5000/api/requests/add",
        headers:{
            Authorization: token,
            fromLanguage: fromLanguage.charAt(0).toUpperCase()+fromLanguage.slice(1),
            toLanguage: toLanguage.charAt(0).toUpperCase()+toLanguage.slice(1),    
            startDate: (String)(startDate),
            finishDate: (String)(finishDate),
            madeBy: (String)(username)
        }
      })
      .then(window.location.reload())
      .catch(err => alert(err.message))
  };
    return (
        <div>
            {/* <NavPills
                alignCenter
                color="primary"
                tabs={[
                {
                    tabButton: "Requests",
                    tabIcon: ForumIcon,
                    tabContent: ( */}
                        <div style={{textAlign:"end"}}>                    
                            <Button  variant="contained" color="primary" onClick={handleOpen}> Make Requests</Button> 
                            <MaterialTable
                                style={{position:"relative",backgroundColor:"#D5D2C7",boxShadow:"none"}}
                                title="Requests"
                                columns={requestsColumns}
                                data={requestsData}
                                actions={[
                                {
                                    icon: DeleteIcon,
                                    iconProps: { style: { fontSize: "14px", color: "green" } },
                                    tooltip: "Delete Request",
                                    onClick: (event, rowData) => handleDelete(rowData)
                                }
                                ]}
                                options={{
                                headerStyle: 
                                {
                                    backgroundColor: "#B9B6A9"
                                },
                                actionsColumnIndex: -1,
                                paginationType: "stepped",
                                loadingType: "linear",
                                // grouping: true,
                                // emptyRowsWhenPaging: false
                                }}
                                icons={{
                                    Search: SearchIcon,
                                    Add: AddIcon,
                                    FirstPage: SkipPreviousIcon,
                                    LastPage: SkipNextIcon,
                                    NextPage: ArrowRightIcon,
                                    PreviousPage: ArrowLeftIcon,
                                    Edit: EditIcon,
                                    Delete: DeleteIcon,
                                    ResetSearch: ClearIcon,
                                    SortArrow: ArrowUpwardIcon,
                                    Clear: ClearIcon,
                                    Check: CheckIcon,
                                    DetailPanel: ChevronRightIcon
                                }}
                            />
                        </div>
                    {/* )
                }
                ]}
            /> */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Make a Request</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To submit a request, please enter the following requirments here.
                </DialogContentText>
                <TextField                            
                    margin="dense"
                    id="fromLanguage"
                    label="From Language"
                    fullWidth
                    onChange= {fromLanguageChange}
                    autoComplete= "off"
                />
                <TextField 
                    margin="dense"
                    id="toLanguage"
                    label="To Language"
                    fullWidth
                    onChange={toLanguageChange}
                    autoComplete= "off"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        fullWidth
                        id="date-picker-dialog"
                        label="Date"
                        format="dd/MM/yyyy"
                        value={startDate}
                        onChange={onChangeTwo}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <div class="timePick">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin= "normal"
                            id="start-time"
                            label="Start Time"
                            value={startDate}
                            onChange={StartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            style={{ width: "50%"}}
                        />
                        <KeyboardTimePicker
                            margin= "normal"
                            id="finish-time"
                            label="Finish Time"
                            value={finishDate}
                            onChange={finishDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            style={{ width: "50%"}}
                        />
                    </MuiPickersUtilsProvider>
                </div>                        
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
  
}
