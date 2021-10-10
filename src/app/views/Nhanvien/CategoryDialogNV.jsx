import React, { Component } from "react";
import
  {
    Dialog,
    Button,
    Grid,
    DialogActions,
    FormControl,
    Paper,
    DialogTitle,
    DialogContent,
    IconButton,
    Icon
  } from "@material-ui/core";
// import Paper from '@material-ui/core/Paper'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Draggable from "react-draggable";
import NotificationPopup from "../Component/NotificationPopup/NotificationPopup";
import
  {
    saveItem,
    addItem,
    updateItem,
    checkCode,
  } from "./CategoryServiceNV";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure( {
  autoClose: 2000,
  draggable: false,
  limit: 3,
} );

function PaperComponent ( props )
{
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={ '[class*="MuiDialogContent-root"]' }
    >
      <Paper { ...props } />
    </Draggable>
  );
}

class CategoryDialog extends Component
{
  state = {
    id: "",
    code: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    description: "",
    type: "",
    shouldOpenNotificationPopup: false,
    Notification: "",
  };

  handleDialogClose = () =>
  {
    this.setState( { shouldOpenNotificationPopup: false } );
  };

  handleChange = ( event, source ) =>
  {
    event.persist();
    if ( source === "switch" )
    {
      this.setState( { isActive: event.target.checked } );
      return;
    }
    this.setState( {
      [event.target.name]: event.target.value,
    } );
  };

  handleFormSubmit = () =>
  {
    let { id } = this.state;
    let { code } = this.state;
    var { t } = this.props;
    checkCode( id, code ).then( ( result ) =>
    {
      //Nếu trả về true là code đã được sử dụng
      if ( result.data )
      {
        toast.warning( t( "general.dupli_code" ) );
        // alert("Code đã được sử dụng");
      } else
      {
        //Nếu trả về false là code chưa sử dụng có thể dùng
        if ( id )
        {
          updateItem( {
            ...this.state,
          } ).then( () =>
          {
            toast.success( t( "general.updateSuccess" ) );
            this.props.handleOKEditClose();
          } );
        } else
        {
          saveItem( {
            ...this.state,
          } ).then( () =>
          {
            toast.success( t( "general.addSuccess" ) );
            this.props.handleOKEditClose();
          } );
        }
      }
    } );
  };

  componentWillMount ()
  {
    //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
    let { open, handleClose, item } = this.props;
    this.setState( { ...item } );
  }

  render ()
  {
    let {
      id,
      name,
      code,
      email,
      phone,
      age,
      description,
      shouldOpenNotificationPopup,
    } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    return (
      <Dialog
        open={ open }
        PaperComponent={ PaperComponent }
        maxWidth="sm"
        fullWidth
      >
        
        <DialogTitle style={{ cursor: 'move',border : '1px solid rgb(216, 213, 213)' }} id="draggable-dialog-title">
        <span className="mb-20" style={{fontSize:'120%',fontFamily:'Arial,Helvetica,sans-serif',fontWeight:'bold',color:'#409b3e'}} > 
            {id ? t( "general.update" ) : t( "general.addNew" )} 
        </span>
        <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={() => handleClose()}><Icon color="error"
              title={t("close")}>
              close
        </Icon>
        </IconButton>
        </DialogTitle>

        <ValidatorForm ref="form" onSubmit={ this.handleFormSubmit }>
          <DialogContent>
            <Grid className="" container spacing={ 2 }>
              
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={ { color: "red" } }>*</span>
                      { t( "general.code" ) }
                    </span>
                  }
                  onChange={ this.handleChange }
                  type="text"
                  name="code"
                  value={ code }
                  validators={ ["required"] }
                  errorMessages={ [t( "general.required" )] }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={ { color: "red" } }>*</span>
                      { t( "general.name" ) }
                    </span>
                  }
                  onChange={ this.handleChange }
                  type="text"
                  name="name"
                  value={ name }
                  validators={ ["required"] }
                  errorMessages={ [t( "general.required" )] }
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={ { color: "red" } }>*</span>
                      { t( "general.email" ) }
                    </span>
                  }
                  onChange={ this.handleChange }
                  type="text"
                  name="email"
                  value={ email }
                  validators={ ["required"] }
                  errorMessages={ [t( "general.required" )] }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={ { color: "red" } }>*</span>
                      { t( "general.phone" ) }
                    </span>
                  }
                  onChange={ this.handleChange }
                  type="text"
                  name="phone"
                  value={ phone }
                  validators={ ["required"] }
                  errorMessages={ [t( "general.required" )] }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={ { color: "red" } }>*</span>
                      { t( "general.age" ) }
                    </span>
                  }
                  onChange={ this.handleChange }
                  type="text"
                  name="age"
                  value={ age }
                  validators={ ["required"] }
                  errorMessages={ [t( "general.required" )] }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-12">
              <Button
                variant="contained"
                className="mr-12"
                color="secondary"
                onClick={ () => this.props.handleClose() }
              >
                { t( "general.cancel" ) }
              </Button>
              <Button
                variant="contained"
                style={ { marginRight: "15px" } }
                color="primary"
                type="submit"
              >
                { t( "general.save" ) }
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default CategoryDialog;
