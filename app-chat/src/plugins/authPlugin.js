import { watch } from 'vue';

export default function authPlugin(store) {
    // Watch for store state changes
    watch(() => store.$state, (state) => {
        // Perform actions based on state changes
        console.log('State changed:', state);
    });

    // Watch for store actions
    watch(() => store.$actions, (actions) => {
        // Perform actions based on specific actions
        console.log('Actions:', actions);
    });
}
