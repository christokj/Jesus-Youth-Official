import React from 'react'
import AddMenuItemForm from '../../components/AddMenuItemForm'
import { useParams } from 'react-router-dom';

function NewMenuEntryPage() {

    const { menuName } = useParams();

    return (
        <div>
            <div>
                <AddMenuItemForm menuName={menuName} />
            </div>
        </div>
    )
}

export default NewMenuEntryPage