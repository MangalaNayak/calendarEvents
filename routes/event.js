const express = require('express');
const router = express.Router();
const event = require('../controllers/event.js');

router.post('/create', event.create_event);
router.get('/', event.event_details);
router.get('/range', event.events_details);
router.post('/update', event.update_event)
router.delete('/delete', event.delete_event)

module.exports = router;