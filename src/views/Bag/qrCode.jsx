import React from "react";

import { ip, showError } from '../../common'
import qrcode from 'qrcode-generator'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
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
};


class qrCode extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
          
        }
    }
    

    loadBag = async () => {
        try {
            const qr = qrcode(4, 'L')
            qr.addData(`${ip}/admin/viewBag/${this.props.match.params.id}`)
            qr.make()
            document.getElementById('divQRCode').innerHTML = qr.createImgTag(12,4,'QR Code')
        } catch (err) {
            showError(err)
        }
    }

    componentDidMount(){
      this.loadBag()
      
    }

    render(){

        return (
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardBody style={{textAlign: 'center'}}>
                        <div id={'divQRCode'}></div>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          );
    }
}

    
        
export default withStyles(styles)(qrCode);
     