document.querySelectorAll('.list__star').forEach(item => {
  item.addEventListener('click', () => {
    item.parentNode.dataset.totalValue = item.dataset.itemValue
  })
})
