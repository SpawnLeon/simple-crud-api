#!/usr/bin/env node

import dotenv from 'dotenv';

import makeServer from '../src/index.js';

const DEFAULT_SERVER_PORT = 3000;

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const port = process.env.PORT || DEFAULT_SERVER_PORT;

makeServer(port);
