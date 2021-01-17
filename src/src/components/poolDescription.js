export default {
  //props: ["description"],
  components: {},
  data() {
    return {
      description: {
        name: "Electromagnetic Pendulum",
        short: `A single pendulum with electromagnetic drive system producing simple harmonic motion`,
        long: `A simple pendulum with electromagnetic drive system producing simple harmonic
      motion. The drive and braking effect are variable. They are determined by how
      much of the pendulum's travel the coil remains energised for. The pendulum can
      also be slowed down by short-circuiting the coil, without applying any power,
      or left to swing freely with no drive or braking.`,
        status: "Only a few available now",
        image: "http://localhost:8008/images/penduino-v1.0/image.png",
      },
    };
  },
  computed: {
    title: function () {
      return this.description.name;
    },
    image: function () {
      return this.description.image;
    },
    about: function () {
      return this.description.short;
    },
    status: function () {
      return "no status available";
    },
  },
  methods: {
    request() {
      console.log("requested booking");
    },
  },
};
