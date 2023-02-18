import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ShowFileModal from './ShowFileModal'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'start'
}

const FilesIndex = (props) => {

    const { msgAlert, user, files, filesError, triggerRefresh } = props

    const [fileModalShow, setFileModalShow] = useState(false)
    const [showFile, setShowFile] = useState({})
    // const [updated, setUpdated] = useState(false)
    // console.log('index files', files)
    // console.log('index file', showFile)

    useEffect(()=> {
        triggerRefresh()
    },[updated])

    const onClick = (e) => {
        // console.log('e', e.target)
        e.preventDefault()
        // console.log('file index e value', e.target.value)
        setShowFile(JSON.parse(e.target.value))
        setFileModalShow(true)
    }

    if (filesError) {
        return <p>Loading...</p>
    }
    // if no pets loaded yet, display 'loading'
    if (!files) {
        return <p>Loading...</p>
        // otherwise if there are no pets, display that message
    } else if (files.length === 0) {
        return <p>No files yet, go add some!</p>
	}

    const fileCards = files.map((file, i) => {
        return (
            <>
                <Card className='file-card' key={i}>
                    <Card.Header className='file-card-header'>{file.name}</Card.Header>
                    <Card.Body className='file-card-body'>
                        <Image style={{ width: '138px', height: '134px' }} className='file-card-image'src={file.url} thumbnail/>
                        <Button type='submit' className='file-card-button pe-1' onClick={onClick} value={JSON.stringify(file)}><Image style={{ width: '25%' }} className='pe-1' src='/icons/outline_launch_white_24dp.png' />View File</Button>
                    </Card.Body>
                </Card>
            </>
        )
    })
    
    // return some jsx, a container with all the pet cards
    return (
        <>
            <div className="container-fluid p-0" style={cardContainerStyle}>
                { fileCards }
            </div>
            <ShowFileModal
                user={user}
                file={showFile}
                show={fileModalShow}
                handleClose={() => setFileModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

// export our component
export default FilesIndex