package sharath.newsapp.userActivity.Model;

public class News {
    private String sourceId, sourceName, author, title, description, url, urlToImage, publishedAt, content;

    public void setSourceId(String sourceId) {
        this.sourceId = sourceId;
    }

    public String getsourceId() {
        return sourceId;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getsourceName() {
        return sourceName;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthor() {
        return author;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setImageURL(String urlToImage) {
        this.urlToImage = urlToImage;
    }

    public String getImageURL() {
        return urlToImage;
    }

    public void setPublishDate(String publishedAt) {
        this.publishedAt = publishedAt;
    }

    public String getPublishDate() {
        return publishedAt;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

}
