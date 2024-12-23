git filter-repo --commit-callback'
if commit.author_name == "AgrinetEd":
    commit.author_name = "Farmer-Eds-Shed"
    commit.author_email = "emaherx@gmail.com"
if commit.committer_name == "AgrinetEd":
    commit.committer_name = "Farmer-Eds-Shed"
    commit.committer_email = "emaherx@gmail.com"
' --force