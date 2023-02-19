import { useState } from 'react'
import { Card, Button, Image } from 'react-bootstrap'
import { deleteContributor, updateContributor } from '../../api/contributors'
import messages from '../shared/AutoDismissAlert/messages'
import EditContributorModal from './EditContributorModal'

const ShowContributor = (props) => {
    const { contributor, user, file, msgAlert, triggerRefresh } = props
    // hook to display EditToyModal
    const [editModalShow, setEditModalShow] = useState(false)
    // here, we're going to use react styling objects to our advantage
    // this will look at the toy's condition, and change the background color
    // we'll also use this to set a consistent width for each card
    // we'll pass the results of this function to a style prop in our card
    const setBgCondition = (cond) => {
        if (cond === 'read and write') {
            return({ border: '1px solid #60c689', backgroundColor: '#000000'})
        } else if (cond === 'read only') {
            return({ border: '1px solid #c21858', backgroundColor: '#000000'})
        }
    }
    // Delete, similar to delete for pets, all we have to do is ensure that the user is the pet's owner, and make the api call passing in the right args
    const destroyContributor = () => {
        // thisi s the api call file function
        deleteContributor(user, file, contributor)
        // upon success, we want to send a message
            .then(() => [
                msgAlert({
                    heading: 'Contributor Deleted', 
                    // !message: messages.contributerDeleteSuccess
                    message: messages.contributerDeleteSuccess,
                    variant: 'success'
                })
            ])
        // then trigger a regfresh of the parent component
            .then(() => triggerRefresh())
        // upon failure, send appropriate message
            .catch(() => [
                msgAlert({
                    heading: 'Oh No!', 
                    // !message: messages.contributerDeleteFailure
                    message: messages.contributerDeleteFailure,
                    variant: 'danger'
                })
            ])
    }

    return (
        <>
            <Card id='show-contributor-card' className="m-2" style={setBgCondition(contributor.permissionLevel)}>
                <Card.Body id='show-contributor-body'>
                    <p id='contributor-email'>{contributor.userRef.email}</p>
                    {
                        user && user._id === file.owner?._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                                id="show-contributor-edit"
                            >
                                <Image style={{width: '90%'}} src='/icons/baseline_edit_white_24dp.png'/>
                            </Button>
                            <Button
                                onClick={() => destroyContributor()}
                                variant="danger"
                                className="m-2"
                                id="show-contributor-delete"
                            ><Image style={{width: '90%'}} src='/icons/baseline_delete_forever_white_24dp.png'/></Button>
                        </>
                        :
                        null
                    }
                </Card.Body>
            </Card>
            <EditContributorModal 
                user={user}
                file={file}
                contributor={contributor}
                filterValue={contributor.userRef.email}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowContributor