import React from "react";

import axios from "axios"
import { Redirect } from 'react-router-dom'
import { server, showError } from '../../common'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import classNames from 'classnames';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  divAutocomplete: {
    paddingTop: 30,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
};

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}


class editBag extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
          bagValue: '',
          typeCoffeValue: [],
          producerFarm: '',
          producerName: '',
          lot: '',
          weight: '',
          idLocation: '',
          idCity: '',
          avenue: '',
          street: '',
          position: '',
          floor: '',
          typeCoffe: '',
          isLoading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/admin/bag' />
        }
    }

    handleChange = name => value => {
      this.setState({
        [name]: value,
      })
    }

    onChange = e => this.setState({ 
      [e.target.name]: e.target.value 
    })
    
    edit = async event => {
      event.preventDefault()
        
      try {
        await axios.put(`${server}/bag`, {
          idBag: this.props.match.params.id,
          idLocation: typeof this.state.idLocation.value == 'undefined' ? this.state.idLocation : this.state.idLocation.value,
          lot: this.state.lot,
          weight: this.state.weight,
          producerName: this.state.producerName,
          producerFarm: this.state.producerFarm,
          idCity: typeof this.state.idCity.value == 'undefined' ? this.state.idCity : this.state.idCity.value,
          //idTypeCoffe: typeof this.state.idTypeCoffe.value == 'undefined' ? this.state.idTypeCoffe.map(type => ( type.idTypeCoffe )) : this.state.idTypeCoffe.value.map(type => ( type.idTypeCoffe )),
        })
        this.setRedirect()
      } catch (err) {
          showError(err)
      } 
    }

    loadBag = async () => {
      try {
        const resBag = await axios.get(`${server}/bag/${this.props.match.params.id}`)
        const resType = await axios.get(`${server}/bagTypeCoffe/${this.props.match.params.id}`)
        this.setState({ lot: resBag.data.lot, weight: resBag.data.weight, idCity: resBag.data.idCity,
                        producerName: resBag.data.producerName, idLocation: resBag.data.idLocation,
                        producerFarm: resBag.data.producerFarm, bagValue: resBag.data,
                        typeCoffeValue: resType.data, isLoading: false })
      } catch (err) {
          showError(err)
      }
    } 

    componentDidMount(){
      this.setState({ isLoading: true})
      this.loadBag()
      
    }

    render(){
        
        const { classes } = this.props
        
        const components = {
          Control,
          Menu,
          MultiValue,
          NoOptionsMessage,
          Option,
          Placeholder,
          SingleValue,
        }

        const cities = [
          { label: 'Patos de Minas', value: 1 },
          { label: 'Lagoa Formosa', value: 2 },
          { label: 'Presidente Olegário', value: 3 },
          { label: 'Carmo do Paranaíba', value: 4 },
        ].map(cities => ({
          value: cities.value,
          label: cities.label,
        }));

        const typesCoffe = [
          { label: '080', value: 1 },
          { label: '081', value: 2 },
          { label: '082', value: 3 },
          { label: '083', value: 4 },
        ].map(typesCoffe => ({
          value: typesCoffe.value,
          label: typesCoffe.label,
        }));        
        
        const locations = [
          { label: 'Avenida: A; Rua: A; Posição: 200 Andar: 1;', value: 1 },
          { label: 'Avenida: A; Rua: A; Posição: 200 Andar: 2;', value: 2 },
          { label: 'Avenida: B; Rua: B; Posição: 203 Andar: 1;', value: 3 },
          { label: 'Avenida: C; Rua: A; Posição: 202 Andar: 2;', value: 4 },
        ].map(locations => ({
          value: locations.value,
          label: locations.label,
        }));
        
        return (
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="info">
                      <h4 className={classes.cardTitleWhite}>Saca de Café</h4>
                    </CardHeader>
                    <form onSubmit={this.edit}>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                              id="lot"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                name: "lot",
                                value: this.state.lot,
                                onChange: this.onChange,
                                required: true
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                              id="weight"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                type: 'number',
                                name: "weight",
                                value: this.state.weight,
                                onChange: this.onChange,
                                required: true
                              }}
                            />
                          </GridItem>
                          <GridItem style={{marginTop: 22}} xs={12} sm={12} md={6}>
                            {
                              this.state.isLoading && <span>Carregando, aguarde..</span> 
                            }{ !this.state.isLoading &&
                              <Select
                                  classes={classes}
                                  options={locations}
                                  defaultValue={{value: this.state.idLocation,
                                                  label: `Avenida: ${this.state.bagValue.avenue}; 
                                                    Rua: ${this.state.bagValue.street}; 
                                                    Posição: ${this.state.bagValue.position}; 
                                                    Andar: ${this.state.bagValue.floor};`} }
                                  components={components}
                                  onChange={this.handleChange('idLocation')}
                                  placeholder="Localização"
                                  isClearable
                                />
                            }
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              id="producerName"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                name: "producerName",
                                value: this.state.producerName,
                                onChange: this.onChange,
                                required: true
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              id="producerFarm"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                name: "producerFarm",
                                value: this.state.producerFarm,
                                onChange: this.onChange,
                                required: true
                              }}
                            />
                          </GridItem>
                          <GridItem style={{marginTop: 22}} xs={12} sm={12} md={4}>
                            {
                              this.state.isLoading && <span>Carregando, aguarde..</span> 
                            }{ !this.state.isLoading && 
                                <Select
                                  classes={classes}
                                  options={cities}
                                  defaultValue={{ label: this.state.bagValue.city,
                                                  value: this.state.idCity }}
                                  components={components}
                                  value={this.state.single}
                                  onChange={this.handleChange('idCity')}
                                  placeholder="Cidade do Produtor"
                                  isClearable
                                /> 
                            }
                          </GridItem>
                        </GridContainer>
                        <GridContainer style={{paddingTop: 10}}>
                          <GridItem xs={12} sm={12} md={12}>
                            {
                              this.state.isLoading && <span>Carregando, aguarde..</span> 
                            }{ !this.state.isLoading && 
                              <Select
                                classes={classes}
                                options={typesCoffe}
                                defaultValue={ this.state.typeCoffeValue.map(typesCoffe => ({
                                                  label: typesCoffe.description,
                                                  value: typesCoffe.idTypeCoffe,
                                                })) }
                                components={components}
                                value={this.state.multi}
                                onChange={this.handleChange('idTypeCoffe')}
                                placeholder="Adicionar Tipos de Café"
                                isMulti
                              /> 
                            }
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                      <CardFooter>
                        {this.renderRedirect()}
                        <Button type="submit" color="info">Editar</Button>
                      </CardFooter>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          );
    }
}

    
        
export default withStyles(styles)(editBag);
