<script>
export default {
    name: "RedirectPage",
    data () {
        return {
            articleId: this.$route.params.articleid
        }
    },
    mounted () {
        this.$router.push({ name: 'ArticleDetail', params: { articleid: this.articleId } })
    }
}
</script>