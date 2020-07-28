import React from 'react';
import Modal from 'react-modal';

const customStyles = {
	content: {
		position: 'absolute',
		top: '30%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	},
	overlay: {
		zIndex: 10
	}
};

export const ModalDetail = ({ isOpen, onRequestClose }) => {
	return (
		<Modal
			ariaHideApp={false}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<button onClick={onRequestClose}>close</button>
			<div>I am a modal</div>
			<form>
				<input />
				<button>tab navigation</button>
				<button>stays</button>
				<button>inside</button>
				<button>the modal</button>
			</form>
		</Modal>
	);
};
