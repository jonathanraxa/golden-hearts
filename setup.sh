#!/bin/bash

echo "🚀 Golden Hearts Setup Script"
echo "=============================="
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Create .env.local from template
echo "📝 Creating .env.local from template..."
cp env.example .env.local

echo ""
echo "✅ .env.local created successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Edit .env.local and add your Supabase credentials:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "2. Get your credentials from: https://supabase.com"
echo ""
echo "3. Run the database setup SQL from SUPABASE_SETUP.md"
echo ""
echo "4. Start the development server: npm run dev"
echo ""
echo "📚 For detailed setup instructions, see SUPABASE_SETUP.md"
echo ""
