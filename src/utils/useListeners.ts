import omitBy from 'lodash.omitby';
import { getCurrentInstance, computed } from 'vue';

// Workaround for Vue 3 listeners removal
// https://v3-migration.vuejs.org/breaking-changes/listeners-removed
// https://github.com/vuejs/rfcs/discussions/397#discussioncomment-9010881
// https://github.com/vueuse/vueuse/issues/3550
export function useListeners() {
  const props = getCurrentInstance()?.vnode.props;

  const listeners = computed<Record<string, unknown>>(() => {
    return omitBy(props, (_, key) => !key.startsWith('on'));
  });

  return listeners.value;
}
