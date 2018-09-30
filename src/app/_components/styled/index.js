const {styled} = require('../../../modules/libs')
const colors = require('./colors')

module.exports.Flex = styled.div({
  display: 'flex',
})

// TODO: vue-styled-jss doesn't support composition yet
module.exports.FlexSpaced = styled.div({
  display: 'flex',

  '& > *+*': {
    marginLeft: '1em',
  },
})

module.exports.SpacedVertical = styled.div({
  '& > *+*': {
    marginTop: '1em',
  },
})
