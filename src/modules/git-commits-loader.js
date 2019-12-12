export default class GitCommitsLoader {
  constructor(url, maxGitCommits = 5) {
    this.gitURL = url
    this.maxGitCommits = maxGitCommits
  }

  getCommits() {
    return fetch(this.gitURL)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка получения данных из Git -- ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const commits = []
        const keywordsTotal = Array.from(Object.keys(data)).length
        const commitsArray = keywordsTotal < this.maxGitCommits ? keywordsTotal : this.maxGitCommits
        for (let key = 0; key < commitsArray; key += 1) {
          commits.push({
            name: data[key].commit.committer.name,
            email: data[key].commit.committer.email,
            date: new Date(Date.parse(data[key].commit.committer.date)),
            message: data[key].commit.message,
            avatar: data[key].author.avatar_url,
          })
        }
        return commits
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}
