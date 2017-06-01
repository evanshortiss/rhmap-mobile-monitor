import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../interfaces/global';
import * as moment from 'moment';
import { openUrl } from '../util';
import { FeedEntry } from '../interfaces/datasets/newsfeed';

interface FeedViewProps {
  newsfeed: {
    [key: string]: FeedEntry
  }
}

class FeedView extends React.Component <FeedViewProps, undefined> {
  render() {
    const self = this;

    function sortItems (a: string, b: string) {
      const d1 = moment(self.props.newsfeed[a].data.pubDate);
      const d2 = moment(self.props.newsfeed[b].data.pubDate);

      return d1.isBefore(d2) ? 1 : -1;
    }

    function generateItem (entryId: string) {
      const feedItem = self.props.newsfeed[entryId];

      return (
        <div onClick={() => openUrl(feedItem.data.link)} className="entry" key={entryId}>
          <h3>{feedItem.data.title}</h3>
          <p>{moment(feedItem.data.pubDate).format('dddd, MMMM Do YYYY, hh:mm a')}</p>
        </div>
      )
    }

    const entries = Object.keys(this.props.newsfeed)
      .sort(sortItems)
      .map(generateItem);

    return (
      <div className="newsfeed">
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
