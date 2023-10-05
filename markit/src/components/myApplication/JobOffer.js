// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: View, Accept/Reject the job offer

import {React,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'react-bootstrap/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const JobOffer = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [jobOffer, setJobOffer] = useState([{role:"Teaching Assistant (TA65)",course:'Advanced Software Development',jobDetails:"Prep (1 hr/wk) Weekly, TA Meetings (1/2 hr/wk), Monitor Student Groups (2 hrs/wk),Training & Admin (3 hrs total)"
    ,wagePerHour:'$22 CAD', totalHours:"65 Hours"}])

    const [formValue, setFormValue] = useState({
      comments: ''
     })

    //  Form Validation
    const [errors,setErrors] = useState({comments:''})
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = (event)=>{
      event.preventDefault()
      validateForm()
    }

     // Update Form input values 
     const handleInputChange = (event)=>{
      setFormValue({
          ...formValue,
          [event.target.name] : event.target.value
      })
  }

  
   

    return (
        <section>
             <div className={classes.root}>
                {jobOffer.map((offer,index)=>
                      <Accordion expanded={expanded === 'panel'+index+1} onChange={handleChange('panel'+index+1)}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panelbh-content"+index+1}
                        id={"panelbh-header"+index+1}
                        >
                        <Typography className={classes.heading}>{offer.role}</Typography>
                        <Typography className={classes.secondaryHeading}>{offer.course}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Total Hours:
                                <Box fontWeight="fontWeightLight" >
                                    {offer.totalHours}
                                </Box>
                            </Box>
                          </Typography>

                          <Typography>
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Hourly Rate:
                                <Box fontWeight="fontWeightLight" >
                                    {offer.wagePerHour}
                                </Box>
                            </Box>
                          </Typography>

                          <Typography>
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Duties:
                                <Box fontWeight="fontWeightLight" >
                                    {offer.jobDetails}
                                </Box>
                            </Box>
                          </Typography>
                          <section style ={{'margin-left':'10px'}}>
                            <form  >
                            <div>
                                <TextField id="comments" label="Comments" name="comments" required onChange= {handleInputChange} value= {formValue.comments} error= {errors.comments=== ''?false:true}
                                helperText={errors.comments=== ''?"Please enter offer confirmation message or reason for declining the offer":errors.comments} fullWidth
                                />
                              </div> 
                              <div>
                                <Button  variant="danger" style = {{'margin-right':'5%', 'margin-top':'20px'}} onClick= {handleSubmit}>Decline</Button> 
                                <Button  variant="success" style = {{'margin-right':'5%', 'margin-top':'20px'}} onClick= {handleSubmit}>Accept</Button> 
                              </div>
                            </form>
                          </section>
                        
                        </AccordionDetails>
                  </Accordion>
                         
                 )}
            </div>
        </section>
    )
    
    // Validate All form fields on submit and update the error state variable
    function validateForm(){
      
      let error = {};

      if (!formValue.comments.trim()) {
        error.comments = 'Please enter comments';
      }
      else error.comments ='';

      setErrors(error);       

  }
}

export default JobOffer
