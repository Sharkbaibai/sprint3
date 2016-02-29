// Example "users" model
module.exports = {
  '_id': 'string',
  'username': 'string',
  'email': 'email',
  'password': 'string',
  'active': 'boolean',
  'tags': 'array',
  'posts': 'number',
  'joined': 'timestamp',
  'bio': {
    'fname': 'string',
    'lname': 'string'
  }
};