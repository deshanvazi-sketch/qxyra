'use client';

import { useState } from 'react';
import { Review } from '@/types';
import { formatDate, getInitials, cn } from '@/lib/utils';
import { Star, CheckCircle2, ChevronDown } from 'lucide-react';

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  rating: number;
}

export function ProductReviews({ productId, reviews, rating }: ProductReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  // Calculate rating breakdown
  const totalReviews = reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: totalReviews > 0 ? (reviews.filter(r => r.rating === stars).length / totalReviews) * 100 : 0
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    alert('Review submitted successfully! (Mock)');
    setShowForm(false);
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-heading font-semibold mb-8">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Rating Summary */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start">
          <div className="flex items-end gap-3 mb-2">
            <span className="text-5xl font-heading font-light">{rating.toFixed(1)}</span>
            <span className="text-gray-500 mb-1">out of 5</span>
          </div>
          
          <div className="flex text-brand-gold mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn("w-5 h-5", star <= Math.round(rating) ? "fill-current" : "text-gray-300")}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">Based on {totalReviews} reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="md:col-span-8 flex flex-col gap-2">
          {ratingCounts.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12 text-sm text-gray-600">
                <span>{stars}</span>
                <Star className="w-3 h-3 fill-current text-brand-gold" />
              </div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-gold rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-10 text-right text-sm text-gray-500">
                {percentage > 0 ? Math.round(percentage) : 0}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
        <h3 className="font-heading font-medium text-lg">Showing {totalReviews} Reviews</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-black text-white px-6 py-2 rounded-md font-body text-sm hover:bg-neutral-800 transition-colors"
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-xl mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <h4 className="font-heading font-medium mb-4">Write your review</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={cn(
                      "w-8 h-8 transition-colors", 
                      star <= newRating ? "fill-brand-gold text-brand-gold" : "text-gray-300 hover:text-brand-gold/50"
                    )} 
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="comment">
              Review
            </label>
            <textarea
              id="comment"
              rows={4}
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-black focus:ring-brand-black p-3 border"
              placeholder="What did you like or dislike? What did you use this product for?"
            />
          </div>
          <button 
            type="submit"
            className="bg-brand-black text-white px-8 py-3 rounded-md font-medium hover:bg-neutral-800 transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Review List */}
      <div className="flex flex-col gap-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-heading font-medium text-gray-600">
                    {getInitials(review.userName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium font-heading">{review.userName}</span>
                      {review.isVerified && (
                        <span className="flex items-center text-xs text-green-600 font-medium">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
                  </div>
                </div>
                <div className="flex text-brand-gold">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn("w-4 h-4", star <= review.rating ? "fill-current" : "text-gray-300")}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed font-body">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
}
