// @flow
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import type { SavedEvents, EventDays } from "../../data/event-deprecated";
import { withNavigationFocus } from "../../lib/navigation";
import type { NavigationProps } from "../../lib/navigation";
import EventList from "../../components/EventList";
import text from "../../constants/text";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { bgColor } from "../../constants/colors";
import { EVENT_DETAILS } from "../../constants/routes";
import locale from "../../data/locale";
import NoSavedEvents from "./NoSavedEvents";

export type Props = {
  events: EventDays,
  savedEvents: SavedEvents,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  loading: boolean,
  refreshing: boolean,
  updateData: () => Promise<void>
};

type AllProps = Props & NavigationProps;

class SavedEventListScreen extends Component<AllProps> {
  shouldComponentUpdate(nextProps: AllProps) {
    return nextProps.isFocused;
  }

  render() {
    const {
      navigation,
      updateData,
      events,
      savedEvents,
      addSavedEvent,
      removeSavedEvent,
      refreshing,
      loading
    } = this.props;

    return (
      <View style={styles.container}>
        <Header
          title={text.savedEventsTitle}
          testID="page-heading-saved-events"
        />
        {loading && <Loading />}
        {!loading &&
          events.length === 0 && <NoSavedEvents navigation={navigation} />}
        {!loading &&
          events.length !== 0 && (
            <EventList
              locale={locale}
              events={events}
              savedEvents={savedEvents}
              addSavedEvent={addSavedEvent}
              removeSavedEvent={removeSavedEvent}
              refreshing={refreshing}
              onRefresh={() => {
                updateData();
              }}
              onPress={(eventId: string) => {
                navigation.navigate(EVENT_DETAILS, { eventId });
              }}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor
  }
});

export { SavedEventListScreen };
export default withNavigationFocus(SavedEventListScreen);
