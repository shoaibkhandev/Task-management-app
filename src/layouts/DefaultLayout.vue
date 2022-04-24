<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-main>
            <div>
              <slot />
            </div>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
const defaultLayout = "DefaultLayout";
export default {
  name: "DefaultLayout",
  computed: {
    layout() {
      const layout = this.$route?.meta?.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
