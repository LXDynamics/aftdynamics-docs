---
sidebar_position: X
sidebar_label: [Employee Name]
---

import { ProtectedEmail, ProtectedPhone, NoIndexHead } from '@site/src/components/ProtectedContact';
import { AuthorBlogPosts } from '@site/src/components/AuthorBlogPosts';

<NoIndexHead />

# [Employee Full Name, Title]

![Employee Name](./img/employee-photo.jpg)

## Contact

- Email: <ProtectedEmail user="[username]" domain="aftdynamics.com" />
- Phone: <ProtectedPhone countryCode="[+XX]" number="[XXX XXX XXX]" />
- LinkedIn: [Employee Name](https://www.linkedin.com/in/[username]/)
- GitHub: [GitHub Username](https://github.com/[username])

## About

[Employee bio paragraph describing their role, education, experience, and expertise at AFTdynamics.]

## Recent Blog Posts

<AuthorBlogPosts authorId="[authorId]" maxPosts={6} showTags={false} />

### Most Used Tags

<AuthorBlogPosts authorId="[authorId]" maxPosts={6} showPostsOnly={false} showTagsOnly={true} />
