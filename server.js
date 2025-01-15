const axios = require('axios');
const cors = require('@fastify/cors');

const fastify = require('fastify')({
	logger: true
});

fastify.register(cors);

fastify.get('/', async (request, reply) => {
	return { hello: 'world' };
});

fastify.get('/get-events', async (request, reply) => {
	console.log(JSON.stringify(request.headers, null, 2));
	const response = await axios.get(
		'https://api.tech.onefc.com/content/api/v1/events?skip=0&limit=10&type=upcoming',
		{
			headers: {
				'Content-Type': 'application/json',
				locale: 'en-us'
			}
		}
	);
	return reply.send(response.data);
});

const start = async () => {
	try {
		await fastify.listen({ port: 3000 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
