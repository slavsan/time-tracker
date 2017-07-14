import * as React from 'react';
import { FormEvent } from 'react';
import { Form, Nav, NavItem } from 'react-bootstrap';
import './Navigation.css';

type Props = {
  activeTab: number,
  onChangeTab: Function
};

class Navigation extends React.Component<{}, {}> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Nav
        bsStyle="pills"
        className="Navigation"
        activeKey={this.props.activeTab}
        onSelect={(activeTab: FormEvent<Form>) => this.props.onChangeTab(activeTab)}
      >
        <NavItem eventKey={1}>Activities</NavItem>
        <NavItem eventKey={2}>History</NavItem>
        <NavItem eventKey={3}>Stats</NavItem>
        <NavItem eventKey={4}>Settings</NavItem>
      </Nav>
    );
  }
}

export default Navigation;
