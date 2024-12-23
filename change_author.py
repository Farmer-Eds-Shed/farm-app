#!/usr/bin/env python3
import os
import sys

if 'GIT_DIR' not in os.environ:
    os.environ['GIT_DIR'] = '.git'

def rewrite_author(commit):
    if commit.author_name == b"AgrinetEd":
        commit.author_name = b"Farmer-Eds-Shed"
        commit.author_email = b"emaherx@gmail.com"
    if commit.committer_name == b"AgrinetEd":
        commit.committer_name = b"Farmer-Eds-Shed"
        commit.committer_email = b"emaherx@gmail.com"

from git_filter_repo import filter_repo

filter_repo(
    commit_callback=rewrite_author,
)