<template>
  <v-row justify="center">
    <v-dialog
      :value="$store.state.attachementsModal"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          Attachements ({{ attachements.length }})
        </v-card-title>
        <v-row no-gutters>
          <v-col
            cols="4"
            v-for="(image, index) in images"
            :key="`attachement-${index}`"
          >
            <v-card class="mx-3">
              <v-img height="150px" :src="image.src"></v-img>
              <p class="text-center text-subtitle-1">{{ image.name }}</p>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeModal"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    attachements: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    images() {
      return this.attachements.map((attachement) => {
        return {
          src: URL.createObjectURL(attachement),
          name: attachement.name,
        };
      });
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("TOGGLE_ATTACHEMENTS_MODAL", false);
    },
  },
};
</script>

<style>
</style>