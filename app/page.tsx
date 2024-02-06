'use client';
import { FormEvent, useState } from 'react';

export default function Home() {
	const subnitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ name: 'Roman', place: 'Lviv' }),
		});

		const data = await response.json();
		console.log(data);
	};

	// const pptSubnitHandler = async (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await fetch('api/ppt', {
	// 			method: 'POST',
	// 			// body: JSON.stringify({ name: 'Roman', place: 'Lviv' }),
	// 		});

	// 		if (!response.ok) {
	// 			throw new Error('Network response was not ok');
	// 		}

	// 		const data = await response.json();
	// 		console.log(data);
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 	}
	// };

	return (
		<main className='main'>
			Hello Form Next js
			<form onSubmit={subnitHandler}>
				<button>SEND</button>
			</form>
			{/* <form onSubmit={pptSubnitHandler}>
				<button>SEND2</button>
			</form> */}
		</main>
	);
}
