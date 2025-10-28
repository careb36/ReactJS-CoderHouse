# Code Documentation Guidelines

This document explains the documentation standards used in this project.

## Language Choice: English

All code comments, JSDoc blocks, and inline documentation are written in **English** for the following reasons:

### 🌍 International Standards

- **Universal Language**: English is the lingua franca of software development
- **Framework Compatibility**: React, Vite, Firebase, and all major tools use English
- **Open Source Ready**: Code is prepared for international collaboration
- **Industry Standard**: Aligns with professional development practices worldwide

### 💼 Professional Benefits

- **Career Development**: Prepares developers for global tech companies
- **Code Portability**: Easier to share, review, and maintain across diverse teams
- **Knowledge Transfer**: Facilitates onboarding of international team members
- **Documentation Consistency**: Matches official library and framework documentation

### 🎯 Best Practices Applied

This project follows these documentation principles:

#### ✅ What IS Documented

1. **Component Purpose** - JSDoc blocks explaining component responsibility
   ```javascript
   /**
    * NavBar - Main navigation component for the coffee e-commerce.
    * Features: category links, search, favorites, currency selector, cart.
    */
   ```

2. **Function Contracts** - Parameters, return values, and behavior
   ```javascript
   /**
    * Adds item to cart or updates quantity if already present.
    * @param {Object} newItem - Product to add
    * @param {number} count - Quantity to add
    */
   ```

3. **Complex Logic** - Non-obvious algorithms and business rules
   ```javascript
   // Validate stock and prepare batch updates for atomicity
   ```

4. **Public APIs** - Exported hooks, utilities, and context providers

#### ❌ What is NOT Documented

1. Self-explanatory code
2. Obvious variable names
3. Standard React patterns
4. Simple arithmetic operations
5. Framework boilerplate

### 📚 Documentation Types Used

#### JSDoc Blocks
Used for functions, components, and hooks:
```javascript
/**
 * Brief description of what the function does.
 * 
 * More detailed explanation if needed.
 *
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 */
```

#### Inline Comments
Used sparingly for clarification:
```javascript
// Cleanup to prevent state updates on unmount
return () => { cancelled = true }
```

#### Section Headers
Used for logical code grouping:
```javascript
// ========== Cart Operations ==========
```

## Files with Documentation

### Core Application
- `src/App.jsx` - Application routing and structure
- `src/components/NavBar/NavBar.jsx` - Main navigation
- `src/components/ItemCount.jsx` - Quantity selector

### Context & State
- `src/context/CartProvider.jsx` - Shopping cart state management
- `src/context/currencyContext.jsx` - Currency selection and conversion

### Firebase Integration
- `src/firebase/api.js` - Firestore data operations
- `src/firebase/storage.js` - Image URL resolution

### Custom Hooks
- `src/hooks/useProductImage.js` - Product image handling
- `src/hooks/useWishlist.js` - Favorites management

## Why This Matters

Good documentation:
- ✅ Reduces onboarding time for new developers
- ✅ Makes code review more efficient
- ✅ Prevents bugs through clear contracts
- ✅ Serves as living documentation
- ✅ Demonstrates professional coding standards

## Maintenance

When adding new code:
1. Add JSDoc to all exported functions and components
2. Document complex logic with inline comments
3. Keep comments concise and meaningful
4. Update documentation when changing behavior
5. Remove outdated or obvious comments

---

**Remember**: Comments explain *why*, not *what*. Write code so clear that it documents itself, then add comments only where they add value.
