# Mental Health Demo

## Project Description
This project aims to provide resources and tools related to mental health awareness and support, focused on offering an engaging user experience. It encompasses information on mental health topics, self-help strategies, and a community support platform.

## Setup Instructions
1. **Clone the Repository**:  
   `git clone https://github.com/ittipathongthong-svg/mental-health-demo.git`

2. **Navigate to the Project Directory**:  
   `cd mental-health-demo`

3. **Install Dependencies**:  
   Run the command to install all dependencies:
   `npm install`

4. **Run the Application**:  
   Start the server with:
   `npm start`

5. **Access the App**:  
   Open your browser and go to `http://localhost:3000` to view the application.

## Customization

### Changing the Banner Image

The hero banner on the home page is fully configurable through an environment variable — no code changes needed.

**Steps:**

1. Copy `.env.example` to `.env.local` (if you haven't already):
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and set `NEXT_PUBLIC_BANNER_URL` to your desired image:

   - **Local file** — place the image in the `public/` folder and use a root-relative path:
     ```env
     NEXT_PUBLIC_BANNER_URL=/my-banner.jpg
     ```
   - **External URL** — use a full `https://` URL:
     ```env
     NEXT_PUBLIC_BANNER_URL=https://example.com/images/my-banner.jpg
     ```

3. Restart the development server (`npm run dev`) or rebuild (`npm run build`) to apply the change.

> **Note:** Only relative paths (starting with `/`) and `https://` URLs are accepted. Any other value falls back to the default `/banner.jpg`.

### Changing the Logo

The navigation logo works the same way. Set `NEXT_PUBLIC_LOGO_URL` in `.env.local`:

```env
NEXT_PUBLIC_LOGO_URL=/my-logo.svg
```

## License
This project is licensed under the MIT License.