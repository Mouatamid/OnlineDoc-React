import React from 'react'

function Modal({content}) {
    return (
        <div className="modal fade" id={content.id} tabIndex="-1" role="dialog" aria-labelledby={`${content.id}Title`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header modal-danger">
                        <h5 className="modal-title" id="exampleModalLongTitle">{content.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {content.body}
                    {content.footer}
                </div>
            </div>
        </div>
    )
}

export default Modal;