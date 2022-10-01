import axios from 'axios';
import { io } from 'socket.io-client';
import { getMachineId, getConfig } from '../util/utils.js';

const start = async (params) => {
  const { port, exposyServer, exposyServerSSL } = params;

  let SERVER_HOST;
  let SERVER_SSL_VERIFY;

  if (exposyServer !== undefined) {
    console.info('Using provided exposy server url');
    // use overriden config
    SERVER_HOST = exposyServer.split('://').pop(); // remove protocall if provided
  } else {
    //  use global config
    console.info('Using exposy server from global configuration');
    const config = getConfig();
    SERVER_HOST = config.SERVER_HOST.split('://').pop(); // remove protocall if provided
  }

  if (exposyServerSSL !== undefined) {
    console.info('Using provided exposy ssl configuration');
    // use overriden config
    SERVER_SSL_VERIFY = exposyServerSSL;
  } else {
    //  use global config
    console.info('Using global exposy ssl configuration');
    const config = getConfig();
    SERVER_SSL_VERIFY = config.SERVER_SSL_VERIFY;
  }

  const machineId = await getMachineId();
  const hostId = `${machineId}_${port}`;

  const localhost = `http://localhost:${port}`;

  const serverProtocol = SERVER_SSL_VERIFY ? 'https' : 'http';
  const socketProtocol = SERVER_SSL_VERIFY ? 'wss' : 'ws';

  const remotehost = `${serverProtocol}://${SERVER_HOST}/${hostId}`;
  const sockethost = `${socketProtocol}://${SERVER_HOST}`;

  const socket = io(sockethost, {
    reconnectionDelayMax: 10000,
    query: {
      hostId,
    },
  });

  socket.on('connect', () => {
    console.log(`${localhost} is now exposed to internet via ${remotehost}`);
  });

  socket.on('duplicate', () => {
    console.warn(
      `${localhost} is already exposed! please terminate earlier exposy command for this port!`
    );
    socket.disconnect();
    process.exit(1);
  });

  socket.on('request', async (payload) => {
    const { method, headers, query, path, requestId, body } = payload;

    try {
      const {
        data,
        status,
        headers: respHeaders,
      } = await axios({
        method,
        url: `${localhost}${path}`,
        data: body,
        params: {
          headers,
          query,
        },
      });

      socket.emit('response', { requestId, data, status, headers: respHeaders });
    } catch (error) {
      if (error.response) {
        const { status, headers: errRespHeaders, data } = error.response;
        socket.emit('response', { requestId, data, status, headers: errRespHeaders });
      } else {
        socket.emit('response', {
          requestId,
          data: { message: 'something went wrong during localhost request forwarding' },
          status: 500,
          headers,
        });
      }
    }
  });

  // TODO handle disconnect events
  // TODO handle socket connection errors
  // TODO handle unhablded exceptions/errors
};

export default start;