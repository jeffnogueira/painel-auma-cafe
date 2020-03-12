import React from "react";

import axios from "axios"
import moment from 'moment'
import qrcode from 'qrcode-generator'
import { server, ip, showError } from '../../common'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx"
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

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
  labelInfo: {
    fontSize: 16,
  },
  divQRCode: {
    marginTop: 60,
    textAlign: 'center',
  }
};

class viewBag extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
          bag: '',
          typeCoffe: [],
        }
        this.newTab = this.newTab.bind(this);
    }

    loadBag = async () => {
      try {
        const resBag = await axios.get(`${server}/bagLot/${this.props.match.params.id}`)
        const resType = await axios.get(`${server}/bagTypeCoffe/${resBag.data.idBag}`)

        this.setState({ bag: resBag.data, typeCoffe: resType.data })
        
        const qr = qrcode(4, 'L')
        qr.addData(`${ip}/admin/viewBag/${this.state.bag.lot}`)
        qr.make()
        document.getElementById('divQRCode').innerHTML = qr.createImgTag(8,4,'QR Code')
        
      } catch (err) {
          showError(err)
      }
    } 

    newTab = async () => {
        window.open(`${ip}/admin/qrCode/${this.state.bag.lot}`, '_blank', 'toolbar=0,location=0,menubar=0')
    }

    componentDidMount(){
        this.loadBag()
    }

    render(){
        
        const { classes } = this.props

        const bag = this.state.bag

        const typesCoffe = this.state.typeCoffe.map(typeCoffe => {
            return( `${typeCoffe.description} ` )
        })
        
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
                            <GridItem xs={12} sm={12} md={6}>

                                <h4>Lote: <label className={classes.labelInfo}>{bag.lot}</label></h4>
                                <h4>Peso: <label className={classes.labelInfo}>{String(bag.weight)}</label></h4>
                                <h4>Adicionada por: <label className={classes.labelInfo}>{bag.name}</label></h4>
                                <h4>Data Entrada: <label className={classes.labelInfo}>{moment(bag.entryDate).format('D/M/YYYY, HH:mm')}</label></h4>
                                <h4>Data Saída: <label className={classes.labelInfo}>{bag.outDate == null ? " - " : moment(bag.outDate).format('D/M/YYYY, HH:mm')}</label></h4>
                                <h4>Localização: <label className={classes.labelInfo}>{`Avenida: ${bag.avenue}; Rua: ${bag.street}; Posição: ${bag.position}; Andar: ${bag.floor};`}</label></h4>
                                <h4>Nome Produtor: <label className={classes.labelInfo}>{bag.producerName}</label></h4>
                                <h4>Fazenda Produtor: <label className={classes.labelInfo}>{bag.producerFarm}</label></h4>
                                <h4>Tipos de Café: <label className={classes.labelInfo}>{typesCoffe}</label></h4>

                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>

                                <div className={classes.divQRCode}>
                                    <div id={'divQRCode'}></div>
                                    <Button value="Visualizar" color="info" onClick={this.newTab.bind()}>Visualizar QR Code em outra aba</Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                      </CardBody>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          );
    }
}

    
        
export default withStyles(styles)(viewBag);
