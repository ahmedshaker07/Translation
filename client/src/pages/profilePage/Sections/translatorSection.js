import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import NavPills from "../../../components/NavPills/NavPills.js";

import MaterialTable from 'material-table';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// @material-ui/icons
import ForumIcon from '@material-ui/icons/Forum';
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
import BlurOffIcon from '@material-ui/icons/BlurOff';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import BlockIcon from '@material-ui/icons/Block';

const requestsColumns = [
    { title: "From", field: "fromLanguage"},
    { title: "To", field: "toLanguage" },
    { title: "Date", field: "startDate", grouping: false , type: "date"},
    { title: "Starts at", field: "startDate", grouping: false, type: "time"},
    { title: "Ends at", field: "finishDate", grouping: false, type: "time"},
    { title: "Made By", field: "madeBy"} 
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

export default function SectionTranslator(){
    const [requestsData,setRequestsData]= React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [languagesChecked,setLanguagesChecked]= React.useState([]);
    const [datesChecked,setDatesChecked]= React.useState([]);
    const [blockedDates,setBlockedDates]= React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    React.useEffect(()=>{
        const cookies= new Cookies();
        const token = cookies.get("token");
        axios.get("http://localhost:5000/api/users/getTranslator/", { headers: { Authorization: token} }).then(async (res) =>{
            setChecked(res.data.blockedDays.map(Number))
            setLanguagesChecked(res.data.languages.map(String))
            setBlockedDates(res.data.blockedDates.map(String))
            setDatesChecked(res.data.blockedDates.map(String))
          }
        )
        axios.get("http://localhost:5000/api/requests/transRequests/", { headers: { Authorization: token } }).then(res => {
            setRequestsData(res.data)
        })
    },[])

    const valueToDay = (value) =>{
      if (value === 0 )
          return "Saturday"
      else if (value === 1 )
          return "Sunday"
      else if (value === 2 )
          return "Monday"
      else if (value === 3 )
          return "Tuesday"
      else if (value === 4 )
          return "Wednesday"
      else if (value === 5 )
          return "Thursday"
      else if (value === 6 )
          return "Friday"
    }
    const handleToggleHolidays = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };
    const handleSetHolidays = () => {
    if(checked.length > 3){
        alert("Only 3 days are allowed or less")
        return;
    }
    if(checked[0] === ""){
        setChecked([])
    }
    const cookies = new Cookies();
    const token = cookies.get("token")
    
    axios({
        method: "post",
        url: "http://localhost:5000/api/users/blockedDays/",
        headers:{
            Authorization: token,
            array: checked.toString(),
        }
    })
    window.location.reload();
    }
    const handleToggleLanguages = value => () => {
      const currentIndex = languagesChecked.indexOf(value);
      const newChecked = [...languagesChecked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setLanguagesChecked(newChecked);
    };
    const handleSetLanguages = () => {
      
      if(checked[0] === ""){
          setLanguagesChecked([])
      }
      const cookies = new Cookies();
      const token = cookies.get("token")
      axios({
          method: "post",
          url: "http://localhost:5000/api/users/setLanguages/",
          headers:{
              Authorization: token,
              array: languagesChecked.toString(),
          }
      })
      window.location.reload();
    }
    const handleToggleDates = value => () => {
      const currentIndex = datesChecked.indexOf(value);
      const newChecked = [...datesChecked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setDatesChecked(newChecked);
    };
    const handleDateChange = (date) => {
      const newArray = [...blockedDates];
      newArray.push((String)(date))
      setBlockedDates(newArray)
      setDatesChecked(newArray)
    };
    const handleBlockDate = () => {
      const cookies = new Cookies();
      const token = cookies.get("token")
      if(datesChecked[0] === ""){
        setDatesChecked([])
    }
      axios({
          method: "post",
          url: "http://localhost:5000/api/users/blockedDates/",
          headers:{
              Authorization: token,
              array: datesChecked.toString(),
          }
      })
      window.location.reload();
    };
    return(
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
                  )
              },
              {
                  tabButton: "Holidays",
                  tabIcon: BlurOffIcon,
                  tabContent: (
                      <div style={{textAlign: "center"}}>
                          <List style={{width: '50%',marginLeft:"auto",marginRight:"auto"}}>
                              {[0, 1, 2, 3, 4, 5, 6].map(value => { const labelId = `checkbox-list-label-${value}`;
                                  
                                      return (
                                          <ListItem key={value} role={undefined} dense button onClick={handleToggleHolidays(value)}>
                                              <ListItemIcon>
                                                  <Checkbox
                                                      edge="start"
                                                      checked={checked.indexOf(value) !== -1}                                                
                                                      tabIndex={-1}
                                                      disableRipple
                                                      inputProps={{ 'aria-labelledby': labelId }}
                                                  />
                                              </ListItemIcon>
                                              <ListItemText id={labelId} primary={valueToDay(value)} />
                                              <ListItemSecondaryAction>
                                                  <IconButton edge="end" aria-label="comments">
                                                      <BlurOnIcon/>                                                        
                                                  </IconButton>
                                              </ListItemSecondaryAction>
                                          </ListItem>
                                          ); 
                                  
                                  
                              })}
                          </List>
                          <Button
                            onClick= {handleSetHolidays}
                            color="secondary"
                          >
                              Set Holidays
                          </Button>                                    
                      </div>
                  )
              },
              {
                tabButton: "Languages",
                tabIcon: GTranslateIcon,
                tabContent: (
                  <div style={{textAlign: "center"}}>
                    <List style={{width: '50%',height: 400,marginLeft:"auto",marginRight:"auto", overflow: "auto"}}>
                        {languages.map(value => {
                          const labelId = `${value}`
                          return (
                              <ListItem key={value} role={undefined} dense button onClick={handleToggleLanguages(value)}>
                                <ListItemIcon>
                                  <Checkbox
                                      edge="start"
                                      checked={languagesChecked.indexOf(value) !== -1}                                                
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value} />
                              </ListItem>
                            );   
                          })
                        }
                    </List>
                    <Button
                      onClick= {handleSetLanguages}
                      color="secondary"
                    >
                        Set Languages
                    </Button>                                    
                  </div>
                )
              },
              {
                tabButton: "Blocked Dates",
                tabIcon: BlockIcon,
                tabContent: (
                  <div style={{textAlign: "center",display:"flex",flexDirection:"column"}}>
                    <List style={{width: '50%',height: 300,marginLeft:"auto",marginRight:"auto", overflow: "auto"}}>
                        {blockedDates.map(value => {
                          const labelId = `${value}`
                          return (
                              <ListItem key={value} role={undefined} dense button onClick={handleToggleDates(value)}>
                                <ListItemIcon>
                                  <Checkbox
                                      edge="start"
                                      checked={datesChecked.indexOf(value) !== -1}                                                
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{ 'aria-labelledby': labelId }}
                                  />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value} />
                              </ListItem>
                            );   
                          })
                        }
                    </List>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="SELECT A DATE"
                        format="dd/MMM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{width: "50%",marginLeft: "auto",marginRight: "auto"}}
                      />
                    </MuiPickersUtilsProvider>
                    <Button
                      onClick= {handleBlockDate}
                      color="secondary"
                      variant="outlined"
                      style={{width: "30%",marginTop: "2%",marginLeft: "auto",marginRight: "auto"}}
                    >
                        Update Blocked Dates
                    </Button>
                  </div>
                )
              }
            ]}
          >
          </NavPills>
          
        </div>
    )
}