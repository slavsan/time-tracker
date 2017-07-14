import * as React from 'react';
import Navigation from './components/Navigation';
import Pages from './components/Pages';
import ActivitiesPage from './components/ActivitiesPage';
import HistoryPage from './components/HistoryPage';
import StatsPage from './components/StatsPage';
import SettingsPage from './components/SettingsPage';
import './bootstrap/css/bootstrap.min.css';
import './bootstrap/css/bootstrap-theme.min.css';
import './TimeTracker.css';

type Props = {};
type State = {
  activeTab: number
};

class TimeTracker extends React.Component<{}, {}> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 1
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(activeTab: number) {
    this.setState({activeTab});
  }

  renderPages() {
    if (this.state.activeTab === 1) {
      return <ActivitiesPage />;
    }

    if (this.state.activeTab === 2) {
      return <HistoryPage />;
    }

    if (this.state.activeTab === 2) {
      return <StatsPage />;
    }

    return <SettingsPage />;
  }

  render() {
    return (
      <div id="main">
        <Navigation
          activeTab={this.state.activeTab}
          onChangeTab={(activeTab: number) => this.setActiveTab(activeTab)}
        />
        <Pages>
          {this.renderPages()}
        </Pages>
      </div>
    );
  }
}

export default TimeTracker;
