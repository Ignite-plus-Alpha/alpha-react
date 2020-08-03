import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import SignInForm from '../../pages/profile/signIn.component'
import SignUp from '../signUp/SignUp.component'

class ModalExampleDimmer extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    return (
      <div>
           
        <Button onClick={this.show('blurring')}>Blurring</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close} style={{padding:"5%", width:"40%"}}>      
          <SignUp/>

        </Modal>
      </div>
    )
  }
}

export default ModalExampleDimmer
