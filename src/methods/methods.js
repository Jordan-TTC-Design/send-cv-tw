const methods = {
  goToPage(routerLink) {
    this.$router.push(routerLink);
  },
  backPage() {
    this.$router.back(-1);
  },
};
export default methods;
