const {jssc, styled} = require('../../../lib/index')
const colors = require('./colors')

jssc({
  // Keep editsection links styled consistently with the pageCommands
  // Also, bold is conventionally used to highlight links if needed
  '@global #bodyContent .mw-editsection a': {
    fontWeight: 'normal !important',
  },
})

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
