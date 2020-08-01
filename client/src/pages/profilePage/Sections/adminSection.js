import React from "react";
import axios from "axios"
import Cookies from "universal-cookie";
import MaterialTable from 'material-table';

// @material-ui/core components
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slide from '@material-ui/core/Slide';

// @material-ui/icons
import ForumIcon from '@material-ui/icons/Forum';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
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

// core components
import NavPills from "../../../components/NavPills/NavPills.js";
import { Button,Dialog ,DialogActions,DialogContent,DialogContentText,DialogTitle, Typography} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const requestsColumns = [
  { title: "From", field: "fromLanguage"},
  { title: "To", field: "toLanguage" },
  { title: "Made By", field: "madeBy"},
  { title: "Date", field: "startDate", grouping: false , type: "date"},
  { title: "Starts at", field: "startDate", grouping: false, type: "time"},
  { title: "Ends at", field: "finishDate", grouping: false, type: "time"},
  { title: "Assigned to", field: "assignedTo"} 
]
const translatorsColumns =[
    { title: "First Name", field: "firstName"},
    { title: "Last Name", field: "lastName"},
    { title: "Username", field: "username"}
]

export default function AdminPage(props) {
    const [value, setValue] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [rowData,setRowData]= React.useState([]);
    const [translatorsData,setTransData]= React.useState([]);
    const [requestsData,setReqData]= React.useState([]);
    const [suitableTranslators,setSuitableTranslators]= React.useState([]);

    React.useEffect(()=>{        
        const cookies= new Cookies();
        const token = cookies.get("token");
        const usertype= cookies.get("usertype")
        if(token !=="" && usertype==="Admin"){
            axios({
                method: 'get',
                url: "http://localhost:5000/api/requests/",
                headers:{
                    Authorization: token
                }
                }).then(res => (setReqData(res.data)))
        .then(axios({
            method: 'get',
            url: "http://localhost:5000/api/users/translators",
            headers:{
                Authorization: token
            }
            }).then(res => (setTransData(res.data))))
        }
    },[])

   const handleOpen = (props) =>{
        setRowData(props)
        let TransTemp= [];
        let blockedTemp= [];
        let blockedRequests= [];

        translatorsData.forEach(translatorData => {
            blockedTemp= [];
            blockedRequests= [];
            if((translatorData.languages.includes(props.fromLanguage))&&(translatorData.languages.includes(props.toLanguage))) { //speaks both languages
                 translatorData.blockedDates.forEach(blockedDate => {
                    blockedTemp.push(blockedDate.substring(0,10))
                })
                if(!blockedTemp.includes(props.startDate.substring(0,10))){ // the request is not in blocked dates
                    if(!translatorData.blockedDays.includes(String((new Date(props.startDate).getDay())))){ // the request is not in blocked days
                        translatorData.requests.forEach(request =>{
                            if(((request.startDate<=props.startDate&&props.startDate<=request.finishDate)||
                                (request.startDate<=props.finishDate&&props.finishDate<=request.finishDate))||
                                ((props.startDate<=request.startDate&&request.startDate<=props.finishDate)||
                                (props.startDate<=request.finishDate&&request.finishDate<=props.finishDate))){
                                    blockedRequests.push(request)
                                }
                        })
                        if(blockedRequests.length===0)
                            TransTemp.push(translatorData)
                    }
                }
                
            }
        })
        setSuitableTranslators(TransTemp)
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setSuitableTranslators([]);
    };
    
    const handleChange = event => {
        setValue(event.target.value);
    };
    
    function handleAssign() {
        const cookies = new Cookies();
        const token = cookies.get("token");
        if(rowData.assignedTo!=="Not Assigned"){
            axios({
                method: 'post',
                url: "http://localhost:5000/api/requests/assignTranslatorPull/",
                headers:{
                    Authorization: token,
                    id: (String)(rowData._id),
                    username: (rowData.assignedTo)
                }
            })
        }
        axios({
            method: 'post',
            url: "http://localhost:5000/api/requests/assignPull/",
            headers:{
                Authorization: token,
                id: (String)(rowData._id),
                username: (rowData.madeBy)
            }
        })
        .then(axios({
            method: 'post',
            url: "http://localhost:5000/api/requests/assign/",
            headers:{
                Authorization: token,
                id: (String)(rowData._id),
                username: (String)(value),
            }
        }))
        .then(axios({
            method: 'post',
            url: "http://localhost:5000/api/requests/assignPush/",
            headers:{
                Authorization: token,
                id: (String)(rowData._id),
                username1: (String)(value),
                username: (rowData.madeBy)
            }
        }))
        setTimeout(() => {
            window.location.reload() 
        }, 500);
        
    }

    return (
        <div>
            <NavPills
                alignCenter
                color="primary"
                tabs={[
                {
                    tabButton: "Requests",
                    tabIcon: ForumIcon,
                    tabContent: (
                        <MaterialTable
                        style={{position:"relative",backgroundColor:"#D5D2C7"}}
                        title="Requests"
                        columns={requestsColumns}
                        data={requestsData}
                        actions={[
                            {
                            icon: EditIcon,
                            iconProps: { style: { fontSize: "14px", color: "green" } },
                            tooltip: "Assign Request",
                            onClick: (event, rowData) => handleOpen(rowData)
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
                    )
                },
                {
                    tabButton: "Translators",
                    tabIcon: SupervisedUserCircleIcon,
                    tabContent: (
                        <MaterialTable
                            style={{position:"relative",backgroundColor:"#D5D2C7"}}
                            title="Translators"
                            columns={translatorsColumns}
                            data={translatorsData}
                            options={{
                            headerStyle: 
                            {
                                backgroundColor: "#B9B6A9"
                            },
                            actionsColumnIndex: -1,
                            paginationType: "stepped",
                            loadingType: "linear",
                            // grouping: true,
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
                            detailPanel={rowData => {
                                    return (
                                        <div style={{backgroundColor: '#B9B6A9'}}>
                                            <Typography  style={{fontSize: 15}}>
                                                Languages: {rowData.languages.toString()}
                                            </Typography>
                                        </div>                                  
                                    )
                                }
                            }
                        />
                        )
                }
                ]}
            />
            <Dialog open={open} onClose={handleClose}  TransitionComponent={Transition} aria-labelledby="form-dialog-title">               
                <DialogTitle id="form-dialog-title">Assign Requests</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select one of the following translators...
                    </DialogContentText> 
                    <RadioGroup
                        aria-label="translators"
                        name="translators"
                        value={value}
                        onChange={handleChange}
                        >
                        {suitableTranslators.map(translator => (
                            <FormControlLabel value={translator.username} key={translator.username} control={<Radio />} label={translator.username} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAssign}>
                        Assign
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
  
}
