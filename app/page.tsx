'use client';
import { FormEvent, useState } from 'react';

export default function Home() {
	const [amount, setAmount] = useState({ title: '' });
	const subnitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ name: 'Roman', place: 'Lviv' }),
		});

		const data = await response.json();
		console.log(data);
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
