# Professional Bio CMS

A modern, full-stack content management system for professional biographies and blogs, built with Strapi (backend) and Next.js (frontend).

## Features

### Backend (Strapi)
- **Global Settings**: Site configuration with logo, social links, theme settings
- **Homepage Dynamic Zones**: Flexible sections (Hero, About, Experience, Skills, Projects, Contact)
- **Blog System**: Full-featured blog with categories, tags, and SEO
- **Draft/Publish**: Preview unpublished content
- **Media Management**: Image uploads with optimization
- **TypeScript**: Fully typed backend

### Frontend (Next.js)
- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Dynamic Homepage**: Renders Strapi Dynamic Zone sections
- **Blog Features**: Listing, pagination, categories, tags
- **SEO Optimized**: Dynamic metadata, Open Graph, structured data
- **Preview Mode**: View draft content with authentication
- **Responsive Design**: Mobile-first, accessible UI
- **Theme Support**: Light/dark/system themes from Strapi

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd professional-bio-cms
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database (port 5432)
   - Strapi backend (port 1337)
   - Next.js frontend (port 3000)

3. **Access the applications**
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Start development server**
   ```bash
   npm run develop
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Environment Variables

### Backend (.env)
```env
# Required
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-app-keys-here"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key

# Database (SQLite by default)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# For PostgreSQL (production)
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=strapi
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=strapi
```

### Frontend (.env.local)
```env
# Strapi API
STRAPI_URL=http://localhost:1337
STRAPI_PREVIEW_TOKEN=your-preview-token-here

# Public URLs
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Content Structure

### Content Types

#### Global (Single Type)
- Site name and description
- Default SEO settings
- Logo and social links
- Theme preference (light/dark/system)

#### Homepage (Single Type)
Dynamic Zone with sections:
- **Hero**: Title, subtitle, avatar, CTA
- **About**: Markdown content with highlights
- **Experience**: Job history with rich descriptions
- **Skills**: Categorized skills with levels
- **Projects**: Portfolio items with images and tags
- **Contact**: Contact information and social links

#### Blog Post (Collection Type)
- Title, slug, excerpt
- Cover image and content
- Categories and tags (many-to-many)
- SEO settings per post
- Draft/publish workflow

#### Category & Tag (Collection Types)
- Name and slug
- Optional descriptions

### Components
- **SEO**: Title, description, Open Graph image, noindex, canonical URL
- Various Dynamic Zone components for homepage sections

## Preview Mode

The CMS supports preview mode for draft content:

1. **Enable Preview Mode**
   - URL: `http://localhost:3000/api/preview?token=YOUR_TOKEN&slug=post-slug&type=post`
   - For homepage: `http://localhost:3000/api/preview?token=YOUR_TOKEN&type=homepage`

2. **Exit Preview Mode**
   - Click "Exit Preview" in the yellow banner
   - Or visit: `http://localhost:3000/api/disable-preview`

## API Endpoints

### Public Endpoints
- `GET /api/global` - Site settings
- `GET /api/homepage` - Homepage content  
- `GET /api/blog-posts` - Blog posts with pagination
- `GET /api/categories` - All categories
- `GET /api/tags` - All tags

### Query Parameters
- `populate=deep` - Include related content
- `filters[field][$eq]=value` - Filter results
- `sort=field:asc|desc` - Sort results
- `pagination[page]=1&pagination[pageSize]=10` - Pagination
- `publicationState=preview` - Include drafts (with auth)

## Development Workflow

### Content Creation
1. **Setup Global Settings**: Configure site name, logo, theme in Strapi admin
2. **Create Homepage**: Add Dynamic Zone sections in desired order
3. **Create Categories/Tags**: Organize your content
4. **Write Blog Posts**: Create posts with SEO settings
5. **Preview Content**: Use preview mode for drafts

### Customization
- **Styling**: Edit `frontend/app/globals.css` and Tailwind config
- **Components**: Modify section components in `frontend/components/sections/`
- **Content Types**: Add fields in Strapi admin or schema files
- **API Logic**: Extend controllers/services in backend

## SEO Features

- **Dynamic Metadata**: Page titles, descriptions, Open Graph tags
- **Structured Data**: Automatic generation for blog posts
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: SEO-friendly robots file
- **Canonical URLs**: Prevent duplicate content
- **Image Optimization**: Next.js automatic optimization

## Deployment

### Production Checklist

#### Backend
- [ ] Set strong secrets in environment variables
- [ ] Configure production database (PostgreSQL recommended)
- [ ] Set up file storage (local/S3/Cloudinary)
- [ ] Enable HTTPS
- [ ] Configure CORS settings

#### Frontend  
- [ ] Set production environment variables
- [ ] Configure domain in `NEXT_PUBLIC_SITE_URL`
- [ ] Set up CDN for static assets
- [ ] Enable analytics (optional)

### Hosting Options
- **Backend**: Railway, Heroku, DigitalOcean, AWS
- **Frontend**: Vercel, Netlify, Railway
- **Database**: PostgreSQL on Railway, Supabase, AWS RDS
- **Media**: Cloudinary, AWS S3, DigitalOcean Spaces

## Webhooks (Optional)

Configure Strapi webhooks to revalidate Next.js pages on content changes:

1. **Strapi Webhook URL**: `https://your-nextjs-site.com/api/revalidate`
2. **Events**: Entry publish, unpublish, update
3. **Include**: `revalidateSecret` in webhook headers

## Troubleshooting

### Common Issues

**Build Errors**
- Check Node.js version (18+ required)
- Clear node_modules and reinstall dependencies
- Verify environment variables

**API Connection Issues**
- Ensure Strapi is running on correct port
- Check CORS settings in Strapi
- Verify STRAPI_URL environment variable

**Preview Mode Not Working**
- Check STRAPI_PREVIEW_TOKEN matches in both apps
- Ensure API permissions allow preview access
- Verify URL parameters are correct

**Database Issues**
- Check database connection settings
- Ensure database server is running
- Verify credentials and permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Check the [GitHub Issues](link-to-issues)
- Review the documentation
- Join our [Discord community](link-to-discord)

---

Built with ❤️ using [Strapi](https://strapi.io) and [Next.js](https://nextjs.org)