'use client';

import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * Catches React reconciliation crashes (e.g. NotFoundError from
 * removeChild when the DOM was mutated by browser auto-translate,
 * extensions, or smooth-scroll libraries). On error we re-mount
 * children with a fresh key so the page becomes usable instead of
 * showing the global "client-side exception" overlay.
 */
export default class HydrationGuard extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch() {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => this.setState({ failed: false }));
    }
  }

  render() {
    return (
      <div key={this.state.failed ? 'recovered' : 'initial'}>
        {this.props.children}
      </div>
    );
  }
}
