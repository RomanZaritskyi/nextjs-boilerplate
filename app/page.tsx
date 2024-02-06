'use client';
import { FormEvent } from 'react';
import { json } from 'stream/consumers';

export default function Home() {
	const subnitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ name: 'Roman', place: 'Lviv' }),
		});

		console.log(await response.json());
	};

	return (
		<main className='main'>
			Hello Form Next js
			<form onSubmit={subnitHandler}>
				<button>SEND</button>
			</form>
		</main>
	);
}
