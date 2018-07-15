import cards from 'cards';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import createObjectProp from 'react-object-prop';
import Link from 'react-router-dom/Link';
import galleryStyles from './gallery-styles';

const EVENT_LISTENER_OPTIONS = {
  passive: true
};

const galleryCards = [];

const gridListTileClasses = createObjectProp();

const gridListTitleBarClasses = createObjectProp();

const HEIGHT = 278; // 139 * 2

const shopCards = [];

const SPACING = 16;

const WIDTH = 446; // 223 * 2

// Generate gallery and shop.
for (const card of cards) {
  if (card.sold) {
    galleryCards.push(card);
  }
  else {
    shopCards.push(card);
  }
}

class Gallery extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.mapCards = this.mapCards.bind(this);
    this.state = {
      cols: this.cols
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize, EVENT_LISTENER_OPTIONS);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize, EVENT_LISTENER_OPTIONS);
  }

  get cols() {
    return WIDTH * Math.ceil(window.document.body.clientWidth / (WIDTH + SPACING));
  }

  handleWindowResize() {
    const cols = this.cols;
    if (cols !== this.state.cols) {
      this.setState({ cols });
    }
  }

  mapCards(card) {
    const actionIcon =
      card.price === null ?
       'N/A' :
        '$' + card.price;
    return (
      <GridListTile
        classes={gridListTileClasses({
          imgFullWidth: this.props.classes.imgFullWidth
        })}
        cols={WIDTH}
        component={Link}
        rows={HEIGHT}
        to={'./' + card.url}
      >
        <img
          alt={card.title}
          className={this.props.classes.image}
          src={card.thumbnail}
        />
        <GridListTileBar
          actionIcon={actionIcon}
          classes={gridListTitleBarClasses({
            actionIcon: this.props.classes.actionIcon
          })}
          title={card.title}
          titlePosition="top"
        />
      </GridListTile>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={this.props.classes.paper}>
          <Typography>
            Welcome to AceAlters, where Ace alters Magic cards.
          </Typography>
        </Paper>
        {
          shopCards.length > 0 ?
            <Paper
              className={this.props.classes.paper}
              key="shop"
            >
              <Typography
                children="Shop / For Sale"
                className={this.props.classes.title}
                variant="title"
              />
              <GridList
                cellHeight={1}
                children={shopCards.map(this.mapCards)}
                cols={this.state.cols}
                spacing={SPACING}
              />
            </Paper> :
            null
        }
        <Paper
          className={this.props.classes.paper}
          key="gallery"
        >
          <Typography
            children="Gallery / Not For Sale"
            className={this.props.classes.title}
            variant="title"
          />
          <GridList
            cellHeight={1}
            children={galleryCards.map(this.mapCards)}
            cols={this.state.cols}
            spacing={SPACING}
          />
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(galleryStyles)(Gallery);