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

module.exports.FlexColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

module.exports.Grid2C = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  justifyContent: 'start',
  alignContent: 'start',

  '& > *:nth-child(odd)': {
    textAlign: 'right',
    paddingRight: '0.5em',
    borderRight: `1px solid ${colors.greyBorder}`,
    marginRight: '0.5em',
  },
})

module.exports.SpacedVertical = styled.div({
  '& > *+*': {
    marginTop: '1em',
  },
})
