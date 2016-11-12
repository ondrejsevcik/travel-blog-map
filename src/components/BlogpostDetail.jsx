import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';

export default class BlogpostDetail extends React.Component {
  static propTypes = {
    selectedBlogpost: React.PropTypes.object.isRequired,
  }

  render() {
    const {selectedBlogpost} = this.props;
    const location = getLocation(selectedBlogpost.url);
    return (
      <Card
        style={{
          boxShadow: "none",
        }}
      >
        <CardMedia>
          <img
            src={selectedBlogpost.image}
            alt={selectedBlogpost.title}
          />
        </CardMedia>
        <CardTitle
          title={selectedBlogpost.title}
          subtitle={location.hostname}
          style={{
            height: "40px",
          }}
        >
          <FloatingActionButton style={{
            position: "relative",
            top: "-96px",
            right: "-250px",
          }}>
            <OpenInNew />
          </FloatingActionButton>
        </CardTitle>
        <CardText>
          {selectedBlogpost.text_short}
        </CardText>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <IconButton
            iconStyle={iconSize}
            style={wrapperSize}
          >
            <ThumbUp />
          </IconButton>
          <IconButton
            iconStyle={iconSize}
            style={wrapperSize}
          >
            <ThumbDown />
          </IconButton>
        </div>
      </Card>
    );
  }
}

const iconSize = {
  width: 48,
  height: 48,
};

const wrapperSize = {
  width: 96,
  height: 96,
  padding: 24,
};

function getLocation(href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
}
