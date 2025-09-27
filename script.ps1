'$content = Get-Content "src/components/ItemDetailContainer/ItemDetailContainer.jsx"' 
'$content = $content -replace "  }, \[\]", "  }, \[\]`n`n  const handleAddToCart = \(quantity\) => \{`n    alert\(\`Agregado \$\{quantity\} unidades de \$\{product.title\} al carrito\`\);`n  \};"' 
$content | Set-Content "src/components/ItemDetailContainer/ItemDetailContainer.jsx" 
