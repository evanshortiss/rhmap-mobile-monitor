
import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../interfaces/global';
import * as moment from 'moment';
import { FeedEntry } from '../interfaces/datasets/newsfeed';

interface FeedViewProps {
  newsfeed: {
    [key: string]: FeedEntry
  }
}

interface FeedItemContentProps {
  feedEntry: FeedEntry
}

interface FeedItemContentState {
  open: boolean
}

class FeedItemContent extends React.Component <FeedItemContentProps, FeedItemContentState> {
  constructor () {
    super();

    this.state = {
      open: false
    };
  }

  toggleDescriptionVisibility () {
    this.setState({
      open: !this.state.open
    });
  }

  render () {
    const feedItem = this.props.feedEntry;

    return (
      <div
        onClick={ () => {this.toggleDescriptionVisibility()} }
        className="entry"
      >
        <h3>{feedItem.data.title}</h3>
        <p>{moment(feedItem.data.pubDate).format('dddd, MMMM Do YYYY, hh:mm a')}</p>

        <div className={'description ' + (this.state.open ? 'open' : 'closed')}>
          <div className="text" dangerouslySetInnerHTML={{__html: feedItem.data.description}}/>
        </div>
      </div>
    )
  }
}

class FeedView extends React.Component <FeedViewProps, undefined> {
  render() {
    const self = this;

    const entries = Object.keys(this.props.newsfeed)
      .sort(function sortItems (a: string, b: string) {
        const d1 = moment(self.props.newsfeed[a].data.pubDate);
        const d2 = moment(self.props.newsfeed[b].data.pubDate);

        return d1.isBefore(d2) ? 1 : -1;
      })
      .map(function generateItem (entryId: string) {
        const feedItem = self.props.newsfeed[entryId];

        return (
          <FeedItemContent key={feedItem.data.pubDate} feedEntry={feedItem}></FeedItemContent>
        )
      });

    return (
      <div className="newsfeed list-view">
        {entries}
      </div>
    )
  }
}

function mapStateToProps( state: GlobalState ): FeedViewProps {
  return {
    newsfeed: state.newsfeed ? state.newsfeed.records : {}
  } as FeedViewProps;
}

export default connect(mapStateToProps)(FeedView);
